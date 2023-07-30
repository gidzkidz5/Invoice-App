export function formatDate(inputDate) {
    // Step 1: Parse the input date string into a Date object
    const dateObj = new Date(inputDate);
  
    // Step 2: Extract day, month, and year from the Date object
    const day = dateObj.getDate();
    const monthNumber = dateObj.getMonth();
    const year = dateObj.getFullYear();
  
    // Step 3: Create an array of month abbreviations
    const monthAbbreviations = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    // Step 4: Assemble the final formatted date string
    const formattedDate = `${day} ${monthAbbreviations[monthNumber]} ${year}`;
  
    return formattedDate;
  }

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export function addDaysToDate(dateString, daysToAdd) {
    // Convert the date string to a Date object
    const date = new Date(dateString);
  
    // Add the specified number of days to the date
    date.setDate(date.getDate() + daysToAdd);
  
    // Get the year, month, and day from the updated Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0, so we add 1 and pad with '0'
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format the date as "YYYY-MM-DD" and return it
    return `${year}-${month}-${day}`;
  }