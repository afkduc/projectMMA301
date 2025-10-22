import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Common Styles
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  // Login Screen Styles
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  switchLabel: {
    fontSize: 16,
    color: '#1f2937',
  },
  loginButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    alignItems: 'center',
    marginTop: 15,
  },
  registerButtonText: {
    color: '#2563eb',
    fontSize: 14,
  },
  // Thêm styles cho login info
  loginInfo: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    marginVertical: 10,
  },
  loginInfoText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 2,
  },
});
