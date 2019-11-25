const nestComments = comments => {
  const commentMap = {};

  // Move all the comments into a map of id => comment
  comments.forEach(comment => (commentMap[comment._id] = comment));

  // Iterate over the comments again and correctly nest the children
  comments.forEach(comment => {
    if (comment.parentComment !== undefined) {
      const parent = commentMap[comment.parentComment];
      (parent.replies = parent.replies || []).push(comment);
    }
  });

  // filter the list to return a list of correctly nested comments
  return comments.filter(comment => comment.parentComment === undefined);
};

export default nestComments;
