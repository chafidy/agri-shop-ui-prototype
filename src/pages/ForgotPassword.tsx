
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'envoi d'email de récupération
    setTimeout(() => {
      if (email) {
        setIsEmailSent(true);
        toast({
          title: "Email envoyé",
          description: "Un lien de récupération a été envoyé à votre adresse email",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Veuillez saisir une adresse email valide",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-green to-farm-green-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Store className="w-10 h-10 text-farm-green" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">FarmShop Pro</h1>
          <p className="text-farm-green-light">Récupération de mot de passe</p>
        </div>

        <Card className="shadow-2xl border-0 animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">
              {isEmailSent ? 'Email envoyé !' : 'Mot de passe oublié ?'}
            </CardTitle>
            <CardDescription>
              {isEmailSent 
                ? 'Vérifiez votre boîte email pour récupérer votre mot de passe'
                : 'Saisissez votre email pour recevoir un lien de récupération'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isEmailSent ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@farmshop.mg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 transition-all duration-200 focus:scale-105"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-farm-green hover:bg-farm-green-dark transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Envoi en cours..." : "Envoyer le lien de récupération"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-gray-600">
                  Si un compte existe avec cette adresse email, vous recevrez un lien de récupération dans quelques minutes.
                </p>
                <Button 
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full"
                >
                  Renvoyer l'email
                </Button>
              </div>
            )}
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button 
                onClick={handleBackToLogin}
                variant="ghost"
                className="w-full text-sm text-gray-600 hover:text-farm-green"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à la connexion
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-xs text-center text-gray-500">
                Solution dédiée aux boutiques de produits d'élevage
              </p>
              <p className="text-xs text-center text-green-600 mt-2 font-medium">
                Mode démonstration : La récupération de mot de passe est simulée
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
