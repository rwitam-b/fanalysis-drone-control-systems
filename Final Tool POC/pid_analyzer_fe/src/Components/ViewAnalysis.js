import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Divider } from 'antd';
import DroneAnalysis from './DroneAnalysis';
import PIDPlots from './PIDPlots';
import LogAggregations from './LogAggregations';

function ViewAnalysis() {
    const { logId } = useParams();
    return (
        <>
            <DroneAnalysis logId={logId}/>
            <br/>
            <LogAggregations logId={logId} />
            <br/>            
            <PIDPlots logId={logId} />
        </>
    );
}

export default ViewAnalysis;
