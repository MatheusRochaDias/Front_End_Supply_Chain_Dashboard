import React from 'react';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

export default function MyPDFComponent() {
  function handleDownloadClick() {
    console.log('Botão de download clicado!');
  }

  return (
    <div>
      <button onClick={handleDownloadClick}>Baixar PDF</button>
      <PDFDownloadLink
        document={<MyDocument />}
        fileName="meu-arquivo.pdf"
        onClick={handleDownloadClick}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Carregando documento...' : 'Baixar PDF'
        }
      </PDFDownloadLink>
    </div>
  );
}

function MyDocument() {
  return (
    <Document>
      <Page>
        <Text>Olá, mundo!</Text>
      </Page>
    </Document>
  );
}