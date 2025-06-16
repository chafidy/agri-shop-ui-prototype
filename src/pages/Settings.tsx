
import { GeneralSettings } from '@/components/settings/GeneralSettings';
import { StockSettings } from '@/components/settings/StockSettings';
import { NumberingSettings } from '@/components/settings/NumberingSettings';
import { TaxSettings } from '@/components/settings/TaxSettings';
import { PaymentSettings } from '@/components/settings/PaymentSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { BackupSettings } from '@/components/settings/BackupSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';

const Settings = () => {
  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configuration de l'application</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralSettings />
        <StockSettings />
        <NumberingSettings />
        <TaxSettings />
        <PaymentSettings />
        <NotificationSettings />
        <SecuritySettings />
        <BackupSettings />
      </div>

      <AppearanceSettings />
    </div>
  );
};

export default Settings;
