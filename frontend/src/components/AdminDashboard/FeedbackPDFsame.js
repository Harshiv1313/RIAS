import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderCollapse: 'collapse',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    textAlign: 'center',
    fontSize: 11,
    width: '14%',
    minWidth: 60, // Minimum width for readability
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#e0e0e0',
  },
});

// Create Document Component
const FeedbackPDFsame = ({ analysisData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Feedback Analysis Report</Text>

        <Text style={styles.title}>Theory Subjects</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Faculty Name</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Subject Name</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Branch</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Type</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Average Rating</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Average Percentage</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Feedback Remark</Text></View>
          </View>
          {analysisData.filter(data => data.type.toLowerCase() === 'theory').map((data, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell}><Text>{data.facultyName}</Text></View>
              <View style={styles.tableCell}><Text>{data.subjectName}</Text></View>
              <View style={styles.tableCell}><Text>{data.branch}</Text></View>
              <View style={styles.tableCell}><Text>{data.type}</Text></View>
              <View style={styles.tableCell}><Text>{data.averageRating}</Text></View>
              <View style={styles.tableCell}><Text>{data.averagePercentage}%</Text></View>
              <View style={styles.tableCell}><Text>{getFeedbackRemark(data.averagePercentage)}</Text></View>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Practical Subjects</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Faculty Name</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Subject Name</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Branch</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Type</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Average Rating</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Average Percentage</Text></View>
            <View style={[styles.tableCell, styles.tableCellHeader]}><Text>Feedback Remark</Text></View>
          </View>
          {analysisData.filter(data => data.type.toLowerCase() === 'practical').map((data, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCell}><Text>{data.facultyName}</Text></View>
              <View style={styles.tableCell}><Text>{data.subjectName}</Text></View>
              <View style={styles.tableCell}><Text>{data.branch}</Text></View>
              <View style={styles.tableCell}><Text>{data.type}</Text></View>
              <View style={styles.tableCell}><Text>{data.averageRating}</Text></View>
              <View style={styles.tableCell}><Text>{data.averagePercentage}%</Text></View>
              <View style={styles.tableCell}><Text>{getFeedbackRemark(data.averagePercentage)}</Text></View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const getFeedbackRemark = (percentage) => {
  if (percentage >= 90) return "Excellent";
  if (percentage >= 80) return "Very Good";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Satisfactory";
  if (percentage >= 40) return "Bad";
  return "Very Bad";
};

export default FeedbackPDFsame;
