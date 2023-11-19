async function connectWallet(): Promise<string | null> {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0]; // The primary account
    } catch (error) {
        console.error('Failed to connect wallet', error);
        return null;
    }
}
