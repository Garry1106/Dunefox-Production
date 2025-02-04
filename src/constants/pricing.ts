export const SUBSCRIPTION_PRICES = {
    Basic:749,
    Standard:1499,
    Premium: 2499,
  } as const;
  
  export type SubscriptionTier = keyof typeof SUBSCRIPTION_PRICES;