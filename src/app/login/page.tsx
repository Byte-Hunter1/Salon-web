import Link from 'next/link';
import { login } from '@/app/actions/auth';
import '../auth.css';

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        <p>Welcome back to Salon Luxe.</p>
        <form action={login} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required placeholder="Enter your email" />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Sign In</button>
        </form>
        <div className="auth-footer">
          <p>Don&apos;t have an account? <Link href="/signup" className="link-gold">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
}
