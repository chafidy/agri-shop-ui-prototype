import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  acceptedFormats?: string[];
}

const ImportDialog = ({ 
  isOpen, 
  onClose, 
  title = "Importer des données",
  acceptedFormats = [".csv", ".xlsx", ".xls"]
}: ImportDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importType, setImportType] = useState('');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const importTypes = [
    { value: 'products', label: 'Produits', description: 'Importer une liste de produits' },
    { value: 'clients', label: 'Clients', description: 'Importer une liste de clients' },
    { value: 'suppliers', label: 'Fournisseurs', description: 'Importer une liste de fournisseurs' },
    { value: 'inventory', label: 'Inventaire', description: 'Mise à jour des stocks' },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Simulation de la lecture du fichier et génération de données de prévisualisation
      const mockData = [
        { nom: 'Aliment vaches laitières', categorie: 'Alimentation', prix: '15000', stock: '150' },
        { nom: 'Vaccin Newcastle', categorie: 'Vétérinaire', prix: '3000', stock: '5' },
        { nom: 'Abreuvoir automatique', categorie: 'Matériel', prix: '12000', stock: '25' },
      ];
      setPreviewData(mockData);
    }
  };

  const handleImport = async () => {
    if (!selectedFile || !importType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier et un type d'import",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulation du processus d'import
    setTimeout(() => {
      toast({
        title: "Import réussi",
        description: `${previewData.length} éléments ont été importés avec succès`,
      });
      
      setIsProcessing(false);
      setSelectedFile(null);
      setPreviewData([]);
      setImportType('');
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewData([]);
    setImportType('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-farm-green-dark">
            <Upload className="w-5 h-5 mr-2 text-farm-green" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sélection du type d'import */}
          <div>
            <Label htmlFor="importType">Type d'import *</Label>
            <Select value={importType} onValueChange={setImportType}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir le type de données à importer" />
              </SelectTrigger>
              <SelectContent>
                {importTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-xs text-gray-600">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sélection du fichier */}
          <div>
            <Label htmlFor="file">Fichier à importer *</Label>
            <div className="mt-2">
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-farm-green border-dashed rounded-lg cursor-pointer bg-farm-cream/10 hover:bg-farm-cream/20 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-farm-green" />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                    </p>
                    <p className="text-xs text-gray-500">
                      Formats acceptés: {acceptedFormats.join(', ')}
                    </p>
                  </div>
                  <input 
                    id="file-upload" 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    accept={acceptedFormats.join(',')}
                    onChange={handleFileSelect}
                  />
                </label>
              </div>
              
              {selectedFile && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <p className="font-medium text-green-800">{selectedFile.name}</p>
                      <p className="text-sm text-green-600">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prévisualisation des données */}
          {previewData.length > 0 && (
            <div>
              <Label>Prévisualisation des données ({previewData.length} lignes)</Label>
              <div className="mt-2 border border-farm-cream rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(previewData[0]).map((key) => (
                        <TableHead key={key} className="bg-farm-cream/30">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableHead>
                      ))}
                      <TableHead className="bg-farm-cream/30">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value: any, cellIndex) => (
                          <TableCell key={cellIndex}>{value}</TableCell>
                        ))}
                        <TableCell>
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">Valide</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Instructions d'import</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Assurez-vous que votre fichier contient les colonnes requises</li>
              <li>• La première ligne doit contenir les en-têtes de colonnes</li>
              <li>• Les données vides seront ignorées</li>
              <li>• En cas de doublon, les données existantes seront mises à jour</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => {
              resetForm();
              onClose();
            }}>
              Annuler
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!selectedFile || !importType || isProcessing}
              className="bg-farm-green hover:bg-farm-green-dark"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Import en cours...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Importer les données
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;