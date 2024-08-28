import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define your styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol80: {
    width: '80%',
    borderRightWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    padding: 5,
  },
  tableCol20: {
    width: '20%',
    padding: 5,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
  },
  tableCellLeft: {
    margin: 5,
    fontSize: 10,
    textAlign: 'left',
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 10,
  },
  detailValue: {
    width: '70%',
    fontSize: 10,
  },
});

const FeedbackPDF = ({ feedbacks, analysisData, filters }) => {
  const formattedAnalysisData = {
    averageScore: analysisData?.averageScore || 'N/A',
    goodFeedbackPercentage: (analysisData?.goodFeedbacks / analysisData?.totalFeedbacks * 100 || 0).toFixed(2) + '%',
    badFeedbackPercentage: (analysisData?.badFeedbacks / analysisData?.totalFeedbacks * 100 || 0).toFixed(2) + '%',
    questionAverages: analysisData?.questionAverages || {},
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Feedback Statistics</Text>
          <Text>Filter and review feedback statistics based on various criteria.</Text>
          {filters && (
            <View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Semester:</Text>
                <Text style={styles.detailValue}>{filters.semester || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Branch:</Text>
                <Text style={styles.detailValue}>{filters.branch || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>{filters.type || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Subject:</Text>
                <Text style={styles.detailValue}>{filters.subject || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Course:</Text>
                <Text style={styles.detailValue}>{filters.course || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Faculty:</Text>
                <Text style={styles.detailValue}>{filters.faculty || 'N/A'}</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.section}>
          <Text>Feedback Statistics</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol80}>
                <Text style={styles.tableCell}>Faculty Name</Text>
              </View>
              <View style={styles.tableCol20}>
                <Text style={styles.tableCell}>Average Rating</Text>
              </View>
              <View style={styles.tableCol20}>
                <Text style={styles.tableCell}>Good Feedback (%)</Text>
              </View>
              <View style={styles.tableCol20}>
                <Text style={styles.tableCell}>Bad Feedback (%)</Text>
              </View>
            </View>
            {feedbacks.length > 0 && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol80}>
                  <Text style={styles.tableCell}>{feedbacks[0].facultyName}</Text>
                </View>
                <View style={styles.tableCol20}>
                  <Text style={styles.tableCell}>{formattedAnalysisData.averageScore}</Text>
                </View>
                <View style={styles.tableCol20}>
                  <Text style={styles.tableCell}>{formattedAnalysisData.goodFeedbackPercentage}</Text>
                </View>
                <View style={styles.tableCol20}>
                  <Text style={styles.tableCell}>{formattedAnalysisData.badFeedbackPercentage}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text>Question Averages</Text>
          <View style={styles.table}>
            {Object.entries(formattedAnalysisData.questionAverages).map(([question, avg], index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol80}>
                  <Text style={styles.tableCellLeft}>{question}</Text>
                </View>
                <View style={styles.tableCol20}>
                  <Text style={styles.tableCell}>{avg}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FeedbackPDF;
