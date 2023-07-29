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