import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataPulseLayout } from '@/components/datapulse/DataPulseLayout';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useDataPulseAuth } from '@/contexts/DataPulseAuthContext';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const DataPulseLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp, isLoading: authLoading } = useDataPulseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/datapulse/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isSignUp) {
        const validation = signupSchema.safeParse(formData);
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: "Account exists",
              description: "An account with this email already exists. Please sign in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign up failed",
              description: error.message,
              variant: "destructive",
            });
          }
          setIsLoading(false);
          return;
        }

        toast({
          title: "Account created!",
          description: "Welcome to DataPulse. Let's connect your store.",
        });
        navigate('/datapulse/onboarding');
      } else {
        const validation = loginSchema.safeParse(formData);
        if (!validation.success) {
          const fieldErrors: Record<string, string> = {};
          validation.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Invalid credentials",
              description: "The email or password you entered is incorrect.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign in failed",
              description: error.message,
              variant: "destructive",
            });
          }
          setIsLoading(false);
          return;
        }

        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate('/datapulse/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  if (authLoading) {
    return (
      <DataPulseLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-dp-purple" />
        </div>
      </DataPulseLayout>
    );
  }

  return (
    <DataPulseLayout>
      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <div className="gf-container max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            {/* Logo */}
            <Link to="/datapulse" className="inline-flex items-center gap-2 mb-8">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--dp-gradient)' }}
              >
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--dp-gradient)' }}>
                  Data
                </span>
                <span className="text-foreground">Pulse</span>
              </span>
            </Link>

            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp 
                ? 'Start your free trial and connect your store' 
                : 'Sign in to access your analytics dashboard'}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg"
          >
            <div className="space-y-5">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={errors.fullName ? 'border-destructive' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {!isSignUp && (
                    <Link 
                      to="/datapulse/contact" 
                      className="text-sm text-dp-purple hover:underline"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full text-white"
                style={{ background: 'var(--dp-gradient)' }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6 text-muted-foreground"
          >
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button 
                  onClick={toggleMode}
                  className="text-dp-purple hover:underline font-medium"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button 
                  onClick={toggleMode}
                  className="text-dp-purple hover:underline font-medium"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </motion.p>
        </div>
      </section>
    </DataPulseLayout>
  );
};

export default DataPulseLogin;
