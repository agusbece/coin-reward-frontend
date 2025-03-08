const MIN_ADDRESS_LENGTH = 6;
const MAX_ADDRESS_LENGTH = 4;

// Function to truncate address (show first 6 and last 4 characters)
export const truncateAddress = (
    addr: string,
    minLength: number = MIN_ADDRESS_LENGTH,
    maxLength: number = MAX_ADDRESS_LENGTH
) => {
    if (!addr) return '';
    return `${addr.substring(0, minLength)}...${addr.substring(addr.length - maxLength)}`;
};
