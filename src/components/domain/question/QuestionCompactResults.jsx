import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { LinearProgress } from '../../common/index.jsx';
import { VStack } from '../../common/layout/index.jsx';
import { Stat } from '../../common/text/index.jsx';
import BarChart from '../../charts/BarChart.jsx';
import useApiConnection from '../../../utils/apiConnection';

const REFRESH_INTERVAL_MS = 1000 * 30;
const QuestionCompactResults = ({ isActive, autoRefresh, questionId }) => {
  const { apiGet } = useApiConnection();
  const [votes, setVotes] = useState(0);
  const [answerWins, setAnswerWins] = useState([]);
  const nextRefreshTime = useRef(0);
  const [progressToNextRefresh, setProgressToNextRefresh] = useState(0);
  const isRefreshing = useRef(true);

  useEffect(() => {
    let refreshInterval;
    if (autoRefresh) {
      refreshInterval = setInterval(() => {
        if (isActive && !isRefreshing.current) {
          const currentTime = (new Date()).getTime();
          const msToNextRefresh = nextRefreshTime.current - currentTime;
          setProgressToNextRefresh(Math.min(100, 100 - (msToNextRefresh / REFRESH_INTERVAL_MS) * 100));
          if (msToNextRefresh <= 0) {
            isRefreshing.current = true;
          }
        }
      }, 50);
    }
    return () => { clearInterval(refreshInterval); }
  }, []);

  useEffect(() => {
    if (isActive && isRefreshing.current) {
      apiGet(`/questions/${questionId}/results`)
        .then((resultsData) => {
          setVotes(resultsData.votes);
          setAnswerWins(resultsData.answerWins);
          nextRefreshTime.current = new Date().getTime() + REFRESH_INTERVAL_MS;
          isRefreshing.current = false;
        })
        .catch(ex => { console.error(ex); });
    }
  }, [isActive, questionId, isRefreshing.current]);

  if (!isActive) { return null; }

  return <VStack alignItems='stretch'>
    <Stat heading='Total Votes' value={votes} />
    <BarChart
      items={answerWins}
      labelFieldName='text'
      valueFieldName='wins'
    />
    {autoRefresh && <LinearProgress value={progressToNextRefresh} height='1px' />}
  </VStack>;
};

QuestionCompactResults.propTypes = {
  isActive: PropTypes.bool,
  autoRefresh: PropTypes.bool,
  questionId: PropTypes.string.isRequired,
};

QuestionCompactResults.defaultProps = { isActive: false, autoRefresh: true };

export default QuestionCompactResults;
