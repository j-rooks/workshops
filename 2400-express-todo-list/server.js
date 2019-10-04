let express = require('express');
let app = express();
let multer = require('multer');
let upload = multer();
let todoItems = [];
let h = (element, children) => {
  return (
    '<' +
    element +
    '>' +
    children.join('\n') +
    '</' +
    element.split(' ').shift() +
    '>'
  );
};
let makePage = () => {
  let lified = todoItems.map((item) => {
    return h('li', [item]);
  });
  return h('html', [
    h('body', [
      h('ul', lified),
      h('form action="/item" method="POST" enctype="multipart/form-data"', [
        h('input type="text" name="todo"', []),
        h('input type="submit"', []),
      ]),
    ]),
  ]);
};
app.get('/', (req, res) => {
  res.send(makePage());
});
app.post('/item', upload.none(), (req, res) => {
  let newTodo = req.body.todo;
  todoItems.push(newTodo);
  res.send(makePage());
});
app.listen(4000, () => {
  console.log('the server has started');
});
