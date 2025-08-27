// Utility functions for CSV export

export const downloadCSV = (data: any[], filename: string, columns?: string[]) => {
  if (data.length === 0) {
    console.warn('No data to export');
    return;
  }

  // Use provided columns or extract from first object
  const headers = columns || Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Header row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

export const exportInventoryCSV = (inventoryData: any[]) => {
  const columns = ['produit', 'stockActuel', 'stockMinimum', 'stockMaximum', 'valeurStock', 'unite'];
  const filename = `inventaire_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(inventoryData, filename, columns);
};

export const exportSalesCSV = (salesData: any[]) => {
  const columns = ['date', 'client', 'produits', 'montant', 'modePaiement'];
  const filename = `ventes_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(salesData, filename, columns);
};

export const exportAccountingCSV = (accountingData: any[]) => {
  const columns = ['date', 'description', 'debit', 'credit', 'solde'];
  const filename = `comptabilite_${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(accountingData, filename, columns);
};

export const exportToCSV = (data: any[][], filename: string) => {
  const csvContent = data.map(row => 
    row.map(field => `"${field}"`).join(',')
  ).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};