import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBet } from '../../store/slices/betSlipSlice';
import { RootState } from '../../store';

interface EventItemProps {
  event: {
    id: number;
    event_name: string;
    team1_name: string;
    team2_name: string;
    event_date: string;
    event_time: string;
    odds_win: number;
    odds_draw: number;
    odds_lose: number;
  };
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const dispatch = useDispatch();
  const selectedBetId = useSelector((state: RootState) => state.betSlip.selectedBetId);
  const bets = useSelector((state: RootState) => state.betSlip.bets);
  const [selectedOdds, setSelectedOdds] = useState<string | null>(null);

  useEffect(() => {
    const bet = bets.find(bet => bet.id === event.id);
    if (bet) {
      setSelectedOdds(bet.bet_type);
    } else {
      setSelectedOdds(null);
    }
  }, [bets, event.id]);

  const handleBetClick = (bet_type: string, odds: number) => {
    setSelectedOdds(bet_type);
    dispatch(addBet({
      id: event.id,
      event_name: event.event_name,
      team1_name: event.team1_name,
      team2_name: event.team2_name,
      bet_type,
      odds,
      amount: 0, // Initialize with a default amount
    }));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-4">
      <div>
        <h3 className="text-sm font-bold text-gray-400">{event.event_name}</h3>
        <p className="text-sm text-gray-400">{new Date(event.event_date).toLocaleDateString()} • {event.event_time}</p>
        <div className="mt-2">
          <div className="flex items-center mt-1">
            <img src="/static/team1-logo.png" alt="Team 1" className="h-6 w-6 mr-2" />
            <span className="text-white">{event.team1_name}</span>
          </div>
          <div className="flex items-center mt-1">
            <img src="/static/team2-logo.png" alt="Team 2" className="h-6 w-6 mr-2" />
            <span className="text-white">{event.team2_name}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div
          className={`text-center cursor-pointer p-2 px-6 rounded-lg ${
            selectedOdds === 'win' ? 'bg-[#35FF97] text-black' : 'bg-gray-700 hover:bg-[#35FF97] text-white'
          }`}
          onClick={() => handleBetClick('win', event.odds_win)}
        >
          <span className="block text-sm">1</span>
          <span className="block font-bold">{event.odds_win.toFixed(2)}</span>
        </div>
        <div
          className={`text-center cursor-pointer p-2 px-6 rounded-lg ${
            selectedOdds === 'draw' ? 'bg-[#35FF97] text-black' : 'bg-gray-700 hover:bg-[#35FF97] text-white'
          }`}
          onClick={() => handleBetClick('draw', event.odds_draw)}
        >
          <span className="block text-sm">X</span>
          <span className="block font-bold">{event.odds_draw.toFixed(2)}</span>
        </div>
        <div
          className={`text-center cursor-pointer p-2 px-6 rounded-lg ${
            selectedOdds === 'lose' ? 'bg-[#35FF97] text-black' : 'bg-gray-700 hover:bg-[#35FF97] text-white'
          }`}
          onClick={() => handleBetClick('lose', event.odds_lose)}
        >
          <span className="block text-sm">2</span>
          <span className="block font-bold">{event.odds_lose.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
