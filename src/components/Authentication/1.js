const f = () => {
  let count = 10;
  if (count > 0) {
    const a = () => {
      count--;
      console.log(count);
    };
  } else {
    return console.log('finish');
  }
};
