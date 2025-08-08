"use server";

async function installSunaForNewUser(userId: string) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const adminApiKey = process.env.KORTIX_ADMIN_API_KEY;
    
    if (!adminApiKey) {
      console.error('KORTIX_ADMIN_API_KEY not configured - cannot install Obi Chat agent');
      return;
    }
    
    console.log(`Installing Obi Chat agent for user ${userId}`);
    const response = await fetch(`${backendUrl}/admin/suna-agents/install-user/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Api-Key': adminApiKey,
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`Obi Chat agent installed for user ${userId}: ${result.agent_id}`);
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Failed to install Obi Chat agent for user ${userId}:`, errorData);
      return false;
    }
  } catch (error) {
    console.error('Error installing Obi Chat agent for new user:', error);
    return false;
  }
}

export async function checkAndInstallSunaAgent(userId: string, userCreatedAt: string) {
  const userCreatedDate = new Date(userCreatedAt);
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  
  if (userCreatedDate > tenMinutesAgo) {
    const installKey = `suna-install-attempted-${userId}`;
    if (typeof window !== 'undefined' && localStorage.getItem(installKey)) {
      console.log(`Obi Chat agent installation already attempted for user ${userId}`);
      return;
    }
    
    console.log(`Installing Obi Chat agent for new user: ${userId}`);
    const success = await installSunaForNewUser(userId);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(installKey, Date.now().toString());
    }
    
    return success;
  }
  
  return false;
} 