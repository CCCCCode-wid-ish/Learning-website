import React from 'react';
import './Table.css';
import Button from '../Button/Button';

const Table = ({ data, columns, onApprove, onReject }) => {
  if (!data || data.length === 0) {
    return <p className="no-data">No records found.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                const key = col.toLowerCase();
                
                // Status Column
                if (key === 'status') {
                  const status = row.status || row.Status || 'PENDING';
                  return (
                    <td key={colIndex}>
                      <span className={`status-badge status-${status.toLowerCase()}`}>
                        {status}
                      </span>
                    </td>
                  );
                }
                
                // Document Column
                if (key === 'document') {
                  const docUrl = row.document || row.Document;
                  return (
                    <td key={colIndex}>
                      {docUrl ? (
                        <a href={docUrl} target="_blank" rel="noreferrer" className="view-doc-link">
                          View Document
                        </a>
                      ) : 'N/A'}
                    </td>
                  );
                }

                // Actions Column
                if (key === 'actions') {
                  const status = row.status || row.Status || 'PENDING';
                  return (
                    <td key={colIndex}>
                      <div className="action-buttons">
                        {onApprove && (
                          <Button 
                            label="Approve" 
                            type="approve" 
                            onClick={() => onApprove(row)}
                            disabled={status === 'APPROVED' || status === 'REJECTED'}
                          />
                        )}
                        {onReject && (
                          <Button 
                            label="Reject" 
                            type="reject" 
                            onClick={() => onReject(row)}
                            disabled={status === 'APPROVED' || status === 'REJECTED'}
                          />
                        )}
                      </div>
                    </td>
                  );
                }

                // Default Column
                const cellValue = row[key] || row[col] || row[col.replace(/ /g, '')];
                return <td key={colIndex}>{cellValue}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
