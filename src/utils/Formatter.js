export const formatPercentage = (num) => {
    if (!num) return "0%"
    return `${(num * 100)}%`
}