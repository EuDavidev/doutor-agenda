import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      console.log("Processando evento invoice.paid");
      if (!event.data.object.id) {
        console.error("ID da assinatura não encontrado");
        throw new Error("Subscription ID not found");
      }

      const invoice = event.data.object as unknown as Stripe.Invoice & {
        parent?: {
          subscription_details?: {
            subscription?: string;
          };
        };
      };

      console.log("Invoice completo:", JSON.stringify(invoice, null, 2));

      // O ID da assinatura está no parent.subscription_details.subscription
      const subscriptionId = invoice.parent?.subscription_details?.subscription;

      console.log("Dados do invoice:", {
        id: invoice.id,
        subscriptionId: subscriptionId,
        customerId: invoice.customer,
        billingEmail: invoice.customer_email,
        amount: invoice.amount_paid,
        status: invoice.status,
      });

      if (!subscriptionId) {
        console.error("ID da assinatura não encontrado no invoice");
        throw new Error("Subscription ID not found in invoice");
      }

      console.log("Buscando assinatura:", subscriptionId);
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      if (!subscription) {
        console.error("Assinatura não encontrada");
        throw new Error("Subscription not found");
      }

      console.log("Dados da assinatura:", {
        id: subscription.id,
        status: subscription.status,
        customerId: subscription.customer,
        metadata: subscription.metadata,
      });

      const userId = subscription.metadata.userId;
      if (!userId) {
        console.error("ID do usuário não encontrado nos metadados");
        throw new Error("User ID not found");
      }

      console.log("Atualizando usuário:", userId);
      try {
        const result = await db
          .update(usersTable)
          .set({
            stripeSubscriptionId: subscriptionId,
            stripeCustomerId: invoice.customer as string,
            plan: "essential",
          })
          .where(eq(usersTable.id, userId));

        console.log("Resultado da atualização:", result);
        console.log("Usuário atualizado com sucesso");
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
      }
      break;
    }
    case "customer.subscription.deleted": {
      if (!event.data.object.id) {
        throw new Error("Subscription ID not found");
      }
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID not found");
      }
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
    }
  }
  return NextResponse.json({
    received: true,
  });
};
