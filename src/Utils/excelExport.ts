// import * as XLSX from 'xlsx';

// export interface RegistrationData {
//   id: string;
//   type: 'admission' | 'event';
//   fullName: string;
//   email: string;
//   mobile: string;
//   address: string;
//   aadharNumber: string;
//   children: Array<{
//     childName: string;
//     fatherName: string;
//     motherName: string;
//     educationStandard: string;
//   }>;
//   submittedAt: string;
// }

// export const exportToExcel = (data: RegistrationData[], filename: string) => {
//   // Prepare data for Excel export
//   const excelData = data.map(registration => {
//     const childrenInfo = registration.children.map((child, index) => ({
//       [`Child_${index + 1}_Name`]: child.childName,
//       [`Child_${index + 1}_Father`]: child.fatherName,
//       [`Child_${index + 1}_Mother`]: child.motherName,
//       [`Child_${index + 1}_Standard`]: child.educationStandard,
//     })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

//     return {
//       'Registration ID': registration.id,
//       'Type': registration.type === 'admission' ? 'Admission' : 'Event',
//       'Full Name': registration.fullName,
//       'Email': registration.email,
//       'Mobile': registration.mobile,
//       'Address': registration.address,
//       'Aadhar Number': registration.aadharNumber,
//       'Number of Children': registration.children.length,
//       'Submitted Date': new Date(registration.submittedAt).toLocaleDateString(),
//       'Submitted Time': new Date(registration.submittedAt).toLocaleTimeString(),
//       ...childrenInfo
//     };
//   });

//   // Create workbook and worksheet
//   const wb = XLSX.utils.book_new();
//   const ws = XLSX.utils.json_to_sheet(excelData);

//   // Set column widths
//   const colWidths = [
//     { wch: 15 }, // Registration ID
//     { wch: 12 }, // Type
//     { wch: 20 }, // Full Name
//     { wch: 25 }, // Email
//     { wch: 15 }, // Mobile
//     { wch: 30 }, // Address
//     { wch: 15 }, // Aadhar Number
//     { wch: 12 }, // Number of Children
//     { wch: 15 }, // Submitted Date
//     { wch: 15 }, // Submitted Time
//   ];
//   ws['!cols'] = colWidths;

//   // Add worksheet to workbook
//   XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

//   // Generate and download file
//   XLSX.writeFile(wb, filename);
// };

// export const exportChildrenToExcel = (data: RegistrationData[], filename: string) => {
//   // Create a separate sheet for children details
//   const childrenData: Array<{
//     registrationId: string;
//     parentName: string;
//     childIndex: number;
//     childName: string;
//     fatherName: string;
//     motherName: string;
//     educationStandard: string;
//   }> = [];
  
//   data.forEach(registration => {
//     if (registration.children.length > 0) {
//       registration.children.forEach((child, index) => {
//         childrenData.push({
//           'Registration ID': registration.id,
//           'Parent Name': registration.fullName,
//           'Parent Email': registration.email,
//           'Parent Mobile': registration.mobile,
//           'Child Number': index + 1,
//           'Child Name': child.childName,
//           'Father Name': child.fatherName,
//           'Mother Name': child.motherName,
//           'Education Standard': child.educationStandard,
//           'Registration Type': registration.type === 'admission' ? 'Admission' : 'Event',
//           'Submitted Date': new Date(registration.submittedAt).toLocaleDateString(),
//         });
//       });
//     } else {
//       // Add a row for registrations with no children
//       childrenData.push({
//         'Registration ID': registration.id,
//         'Parent Name': registration.fullName,
//         'Parent Email': registration.email,
//         'Parent Mobile': registration.mobile,
//         'Child Number': 'N/A',
//         'Child Name': 'No children',
//         'Father Name': 'N/A',
//         'Mother Name': 'N/A',
//         'Education Standard': 'N/A',
//         'Registration Type': registration.type === 'admission' ? 'Admission' : 'Event',
//         'Submitted Date': new Date(registration.submittedAt).toLocaleDateString(),
//       });
//     }
//   });

//   const wb = XLSX.utils.book_new();
//   const ws = XLSX.utils.json_to_sheet(childrenData);

//   // Set column widths
//   const colWidths = [
//     { wch: 15 }, // Registration ID
//     { wch: 20 }, // Parent Name
//     { wch: 25 }, // Parent Email
//     { wch: 15 }, // Parent Mobile
//     { wch: 12 }, // Child Number
//     { wch: 20 }, // Child Name
//     { wch: 20 }, // Father Name
//     { wch: 20 }, // Mother Name
//     { wch: 15 }, // Education Standard
//     { wch: 12 }, // Registration Type
//     { wch: 15 }, // Submitted Date
//   ];
//   ws['!cols'] = colWidths;

//   XLSX.utils.book_append_sheet(wb, ws, 'Children Details');
//   XLSX.writeFile(wb, filename);
// };
