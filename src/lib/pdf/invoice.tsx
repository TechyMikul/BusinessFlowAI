import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 24, marginBottom: 20 },
  section: { margin: 10, padding: 10 },
});

export const InvoiceDocument = ({ invoice }: { invoice: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Invoice {invoice.invoiceNumber}</Text>
        <Text>Subtotal: ${invoice.subtotal}</Text>
        <Text>Tax: ${invoice.tax}</Text>
        <Text>Total: ${invoice.total}</Text>
        <Text>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);
