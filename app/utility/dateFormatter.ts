export const formatDate = (dateString: Date): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  export const getMonthName = (dateString: Date): string => {
    const date = new Date(dateString);
    return monthNames[date.getMonth()];
  };

  export const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];