// Get the sum of all objects 'vote' property of the 'votes' array
const totalVotes = votes => {
  const total = votes.reduce((acc, curr) => {
    return (acc += curr.vote);
  }, 0);
  return total;
};

export default totalVotes;
