



function createPage(ComponentClass) {
  const componentInstance = new ComponentClass()
  const initData = componentInstance.state
  const options = {
    data:initData,
    onLoad(){
      this.$component = new ComponentClass()
      this.$component._init(this)
    },
    onReady(){
      if(typeof this.$component.componentDidMount === 'function'){
        this.$component.componentDidMount()
      }
    }
  }
  const events = ComponentClass.$$events;
  if (events) {
    events.forEach((eventHandlerName) => {
      if (options[eventHandlerName]) return;
      options[eventHandlerName] = function () {
        this.$component[eventHandlerName].call(this.$component);
      };
    });
  }
  return options
}
function update($component, state = {}) {
  $component.state = Object.assign($component.state, state);
  let data = $component.createData(state);
  data['$taroCompReady'] = true;
  $component.state = data;
  $component.$scope.setData(data);
}

class Component{
  constructor(){
    this.state = {}
  }
  setState(state){
    console.log(state, '调用');
    update(this.$scope.$component, state);
  }
  _init(scope){
    console.log('scope', scope)
    this.$scope = scope
  }
}
module.exports = {
  Component,
  createPage
}