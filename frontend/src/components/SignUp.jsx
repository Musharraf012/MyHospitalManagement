import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const rolesList = [
  "super admin",
  "admin",
  "doctor",
  "nurse",
  "receptionist",
  "patient"
];

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      roles: []
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      roles: Yup.array()
        .min(1, 'Select at least one role')
    }),
    onSubmit: async (values, { setSubmitting, resetForm, setStatus }) => {
      try {
        await axios.post('http://localhost:8080/api/auth/signup', values);
        alert("User registered successfully!");
        resetForm();
      } catch (error) {
        setStatus({ error: "Error registering user." });
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="max-w-md mx-auto p-4 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        <div className="mb-4">
          <label>Select Roles</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {rolesList.map((role) => (
              <label key={role} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="roles"
                  value={role}
                  checked={formik.values.roles.includes(role)}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    const updatedRoles = checked
                      ? [...formik.values.roles, value]
                      : formik.values.roles.filter((r) => r !== value);
                    formik.setFieldValue('roles', updatedRoles);
                  }}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
          {formik.touched.roles && formik.errors.roles && (
            <div className="text-red-500 text-sm">{formik.errors.roles}</div>
          )}
        </div>

        {formik.status?.error && (
          <div className="text-red-600 mb-2">{formik.status.error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
