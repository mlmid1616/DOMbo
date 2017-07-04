const DOMNodeCollection = require('./dom_node_collection.js');

function setup () {
    const queue = [];

    return (arg) => {
      document.addEventListener("DOMContentLoaded", function() {
        queue.forEach( (el) => {
          el();
        });
      });
    if (typeof arg === 'function') {
      queue.push(arg);
      return null;
    }

    let htmlEls = [];

    if ( typeof arg === 'string' ) {
      let nodes = document.querySelectorAll(arg);
      htmlEls = Array.from(nodes);
    }

    if ( arg instanceof HTMLElement ) {
      htmlEls = Array.from(arg);
    }

    return new DOMNodeCollection(htmlEls);
  };
}


$l.extend = (original, ...objsToAdd) => {
  let mergedObj = Object.assign(original, ...objsToAdd)
  });
  return mergedObj;
};


$l.ajax = options => {
  const xhr = new XMLHttpRequest();
  const defaults = {
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   method: "GET",
   url: "",
   success: () => {},
   error: () => {},
   data: {},
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
   options.url += "?" + queryFormat(options.data);
  }

  xhr.open(options.method, options.url, true);
  xhr.onload = e => {
    if (xhr.status === 200) {
      options.success(xhr.response);
    } else {
      xhr.error(xhr.response)
    }
  }

  xhr.send(JSON.stringify(options.data))
}

queryFormat = obj => {
  let result = "";
  for(let attr in obj){
    if (obj.hasOwnProperty(attr)){
      result += attr + "=" + obj[attr] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};
