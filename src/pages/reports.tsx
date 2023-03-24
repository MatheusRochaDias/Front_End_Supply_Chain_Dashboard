import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Button } from '@chakra-ui/react';
import { format } from 'date-fns';

interface incomeProps {
  incomeData?: [{
    id: number;
    produto: {
      id: number;
      name: string;
      register_Number: number;
      manufacturer: string;
      type: string;
      description: string;
    };
    dataEvento: string;
    tipoMovimentacao: string;
    local: string;
    quantidadeMovimentada: number
  }]
  disabled?: string
}

function Header() {
  return (
    <View style={{ marginBottom: 20 }}>
      <Image
        src="/assets/logo-white.png"
      />
      <Text style={{ fontSize: 20, textAlign: 'center' }}>
        Seu Texto de Cabeçalho Aqui
      </Text>
    </View>
  );
}

function MyPDFComponent({ incomeData, disabled }: incomeProps) {
  function handleDownloadClick() {
    console.log('Botão de download clicado!', incomeData);
  }
  return (
    <>   {disabled !== "" ? <PDFDownloadLink
      document={<MyDocument incomeData={incomeData} />}
      fileName="meu-arquivo.pdf"
      onClick={handleDownloadClick}

    >
      {({ blob, url, loading, error }) =>
        <Button size="lg" w="100%" mt="6" cursor={disabled !== "" ? "pointer" : "not-allowed"} disabled={disabled !== "" ? true : false} colorScheme="cyan">
          Download
        </Button>

      }
    </PDFDownloadLink>
      : <Button isDisabled size="lg" w="100%" mt="6" cursor={disabled !== "" ? "pointer" : "not-allowed"} disabled={disabled !== "" ? true : false} colorScheme="cyan">
        Download
      </Button>
    }</>
  );
}
function MyDocument({ incomeData }: incomeProps) {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
    },
    table: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000',
      marginBottom: 10,
    },
    tableHeader: {
      backgroundColor: '#ccc',
    },
    tableRow: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: "7px",
      borderBottomWidth: 1,
      borderBottomColor: '#000',
    },
    tableCell: {
      flex: 1,
      padding: 3,
      fontSize: "8px",
    },
    tableHeaderCell: {
      fontWeight: 'bold',
    },
  });
  return (
    <Document>
      <Page style={styles.page}>
        {/* <Header /> */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.tableHeaderCell]}>
              <Text>Nº de Registro</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeaderCell]}>
              <Text>Nome</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeaderCell]}>
              <Text>Marca</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeaderCell]}>
              <Text>Tipo</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeaderCell]}>
              <Text>Data e Hora</Text>
            </View>
            <View style={[styles.tableCell, styles.tableHeaderCell]}>
              <Text>Quantidade</Text>
            </View>
          </View>
          {incomeData && incomeData.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <View style={[styles.tableCell]}>
                <Text>{item.produto.register_Number}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text>{item.produto.name}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text>{item.produto.manufacturer}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text>{item.tipoMovimentacao}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text>{format(new Date(item.dataEvento), 'dd/MM/yyyy HH:mm:ss')}</Text>
              </View>
              <View style={[styles.tableCell]}>
                <Text>{item.quantidadeMovimentada}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}


export default MyPDFComponent;