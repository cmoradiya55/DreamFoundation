# Dream Foundation - Event Registration Form

A comprehensive Next.js application with dynamic, reusable form components built using React Hook Form for validation and error handling.

## 🌟 Features

- **Dynamic Form Components**: Reusable components for various input types
- **Complete Validation**: Built-in validation rules with custom error messages
- **Child Management**: Dynamic addition/removal of child information forms
- **Responsive Design**: Mobile-friendly design with Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application

## 📋 Form Components

### Available Components

1. **TextInput** - For text, email, and number inputs
2. **MobileInput** - Mobile number with country code selector
3. **SelectInput** - Dropdown selection with options
4. **DateInput** - Date picker with min/max constraints
5. **RadioInput** - Radio button groups (horizontal/vertical)
6. **TextArea** - Multi-line text input

### Component Usage

```tsx
import { TextInput, MobileInput, SelectInput } from '../components/FormComponents';

// Text Input
<TextInput
  name="fullName"
  control={control}
  label="Full Name"
  placeholder="Enter your full name"
  required
  error={errors.fullName}
/>

// Mobile Input with Country Code
<MobileInput
  name="mobile"
  control={control}
  label="Mobile Number"
  required
  error={errors.mobile}
/>

// Select Input
<SelectInput
  name="country"
  control={control}
  label="Country"
  options={[
    { value: 'india', label: 'India' },
    { value: 'usa', label: 'USA' }
  ]}
  required
  error={errors.country}
/>
```

## 🚀 Event Registration Form

### Main Form Fields

- **Full Name** - Required text field with pattern validation
- **Mobile Number** - Required mobile with country code (+91, +1, +44, etc.)
- **Email Address** - Required email with format validation
- **Address** - Required textarea with min/max length validation
- **Aadhar Card Number** - Required 12-digit number validation

### Child Information Fields (Dynamic)

Each child form includes:
- **Child Name** - Required text with pattern validation
- **Father's Name** - Required text with pattern validation
- **Mother's Name** - Required text with pattern validation
- **Child's Aadhar Number** - Required 12-digit validation
- **Education Standard** - Required dropdown (Nursery to 12th)

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Event Registration: `http://localhost:3000/eventRegistration`
   - Components Demo: `http://localhost:3000/components-demo`

## 📁 Project Structure

```
src/
├── app/
│   ├── eventRegistration/
│   │   └── page.tsx              # Main registration form
│   ├── components-demo/
│   │   └── page.tsx              # Demo of all components
│   └── globals.css               # Global styles
├── components/
│   ├── FormComponents/           # Reusable form components
│   │   ├── TextInput.tsx
│   │   ├── MobileInput.tsx
│   │   ├── SelectInput.tsx
│   │   ├── DateInput.tsx
│   │   ├── RadioInput.tsx
│   │   ├── TextArea.tsx
│   │   └── index.ts
│   └── ChildForm/
│       └── ChildForm.tsx         # Child information form
├── Utils/
│   ├── validationRules.ts        # Form validation rules
│   └── utils.ts
```

## 🔧 Validation Rules

All form fields include comprehensive validation:

### Text Fields
- **Required**: Field cannot be empty
- **Min Length**: Minimum 2 characters
- **Max Length**: Maximum 100 characters
- **Pattern**: Only letters and spaces allowed

### Email Field
- **Required**: Field cannot be empty
- **Pattern**: Valid email format required

### Mobile Number
- **Required**: Field cannot be empty
- **Pattern**: Exactly 10 digits required

### Aadhar Number
- **Required**: Field cannot be empty
- **Pattern**: Exactly 12 digits required

### Address
- **Required**: Field cannot be empty
- **Min Length**: Minimum 10 characters
- **Max Length**: Maximum 500 characters

## 🎨 Styling

The application uses **Tailwind CSS** for styling with:
- Responsive grid layouts
- Custom focus states
- Error state styling
- Hover effects
- Color-coded feedback

## 🔄 Dynamic Features

### Child Management
- **Add Child**: Click "Add Another Child" to add more children
- **Remove Child**: Remove any child except the first one
- **Validation**: Each child form has individual validation

### Form State Management
- **React Hook Form**: Handles form state and validation
- **useFieldArray**: Manages dynamic child forms
- **Error Handling**: Real-time validation feedback

## 📝 Usage Examples

### Basic Form Setup
```tsx
import { useForm, useFieldArray } from 'react-hook-form';

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      children: [{ name: '', age: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Your form fields here */}
    </form>
  );
};
```

### Custom Validation Rules
```tsx
const validationRules = {
  name: {
    required: 'Name is required',
    minLength: { value: 2, message: 'Name too short' },
    pattern: { value: /^[a-zA-Z\s]+$/, message: 'Only letters allowed' }
  }
};
```

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for Dream Foundation**