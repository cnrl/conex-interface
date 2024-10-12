const currentDate = () => {
  const currentdate = new Date();
  const datetime =
    'Last_export: ' +
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    '_@_' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();

  return datetime;
};

const exportData = data => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = `${currentDate()}.json`;

  link.click();

  document.body.removeChild(link);
};

export default exportData;
