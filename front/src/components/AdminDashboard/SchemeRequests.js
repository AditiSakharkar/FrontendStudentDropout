import React from 'react';

function SchemeRequests({ requests, onApprove, onReject }) {
  return (
    <div className="scheme-requests">
      {requests.map((request) => (
        <div key={request.id} className="scheme-request">
          <h4>{request.schemeName}</h4>
          <p>{request.studentName}</p>
          <button onClick={() => onApprove(request.id)}>Approve</button>
          <button onClick={() => onReject(request.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
}

export default SchemeRequests;