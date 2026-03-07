import Link from 'next/link';
import { signup } from '@/app/actions/auth';
import '../auth.css';

export default function SignupPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join Salon Luxe for premium grooming.</p>
        <form action={signup} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" required placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email" />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Sign Up</button>
        </form>
        <div className="auth-footer">
          <p>Already have an account? <Link href="/login" className="link-gold">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
