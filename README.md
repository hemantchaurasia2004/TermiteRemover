# Using the Script Effectively

## Steps to Follow:

1. **Add Phone Numbers to the Excel Sheet**:
   - Ensure phone numbers are entered in the Excel sheet in the correct format.

2. **Update the Excel Sheet**:
   - Update the Excel sheet with the latest phone numbers. Make sure the sheet is correctly formatted and saved in the appropriate location.
   - Sheet column should be: PhoneNumber
     
Example for people: +19999999999@s.whatsapp.net. (For Indian Numbers: +91 and remove +1, also we just need to write the number the code will format accordingly)
For groups, it must be in the format 123456789-123345@g.us.

3. **Change the Group ID**:
   - Update the script with the actual Group ID of the WhatsApp group. Replace the placeholder Group ID with the actual one in the script.

4. **Install Dependencies**:
   - Run the following command to install the necessary dependencies:
     ```sh
     npm install
     ```

5. **Run the Script**:
   - Start the script by running:
     ```sh
     node index.js
     ```
   - A QR code will appear. Scan this QR code using your WhatsApp to log in.

6. **Remove Members from the Group**:
   - Once logged in, the script will automatically remove the members whose phone numbers are listed in the Excel sheet from the specified group.

7. **Repeat for Other Groups**:
   - To use this script for another group, change the Group ID in the script and repeat the steps above.

**Note**: In the future, a loop or similar mechanism will be added to handle multiple groups collectively.
