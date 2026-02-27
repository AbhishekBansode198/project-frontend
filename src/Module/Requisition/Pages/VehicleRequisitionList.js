import React, { useEffect, useState } from "react";
import { getRequisitions } from "../Services/requisitionService";

function VehicleRequisitionList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const res = await getRequisitions();
        setData(res.data);
    };

    return (
        <div>
            <h2>Vehicle Requisition List</h2>

            <table border="1" width="100%">
                <thead>
                <tr>
                    <th>Req No</th>
                    <th>Requested By</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Project</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Department</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {data.map((r) => (
                    <tr key={r.id}>
                        <td>{r.requisitionNo}</td>
                        <td>{r.requisitionBy}</td>
                        <td>{r.requisitionDate}</td>
                        <td>{r.requisitionTime}</td>
                        <td>{r.projectName}</td>
                        <td>{r.locationFrom}</td>
                        <td>{r.locationTo}</td>
                        <td>{r.department}</td>
                        <td>{r.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default VehicleRequisitionList;