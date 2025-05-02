import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface PremiumContextType {
  isPremium: boolean;
  loading: boolean;
  upgradeToPremium: () => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};

export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!currentUser) {
        setIsPremium(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('is_premium')
          .eq('user_id', currentUser.id)
          .single();

        if (error) throw error;
        setIsPremium(data?.is_premium || false);
      } catch (error) {
        console.error('Error checking premium status:', error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    checkPremiumStatus();
  }, [currentUser]);

  const upgradeToPremium = async () => {
    // This will be implemented when we integrate Stripe
    throw new Error('Premium upgrade not yet implemented');
  };

  return (
    <PremiumContext.Provider value={{ isPremium, loading, upgradeToPremium }}>
      {children}
    </PremiumContext.Provider>
  );
};