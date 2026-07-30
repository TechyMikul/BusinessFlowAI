import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 24, marginBottom: 20 },
  section: { margin: 10, padding: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' }
});

export const QuotationDocument = ({ quotation }: { quotation: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Quotation {quotation.quoteNumber}</Text>
        <Text>Subtotal: ${quotation.subtotal}</Text>
        <Text>Tax: ${quotation.tax}</Text>
        <Text>Total: ${quotation.total}</Text>
      </View>
    </Page>
  </Document>
);
