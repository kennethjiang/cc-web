$(function  () {
  var adjustment
  
  $("ol.simple_with_animation").sortable({
    group: 'simple_with_animation',
    handle: 'i.icon-move',
    //pullPlaceholder: false,
    // animation on drop
    onDrop: function  (item, targetContainer, _super) {
      var clonedItem = $('<li/>').css({height: 0})
      item.before(clonedItem)
      clonedItem.animate({'height': item.height()})
      
      item.animate(clonedItem.position(), function  () {
        clonedItem.detach()
        _super(item)
      })
    },
  
    // set item relative to cursor position
    onDragStart: function ($item, container, _super) {
      var offset = $item.offset(),
      pointer = container.rootGroup.pointer
  
      adjustment = {
        left: pointer.left - offset.left,
        top: pointer.top - offset.top
      }
  
      _super($item, container)
    },
    onDrag: function ($item, position) {
      $item.css({
        left: position.left - adjustment.left,
        top: position.top - adjustment.top
      })
    }
  });


  function readURL(input) {
  
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          input_node = input;
  
          reader.onload = function (e) {
              $($(input_node).closest("li").find("form")).addClass("hidden");
              $($(input_node).closest("li").find("div.pic-preview")).removeClass("hidden");
              $($(input_node).closest("li").find("img")).attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
  
  $('.editable-date').editable({
    type:  'date',
    placement: 'right',
  });

  $('.editable-select').editable({
    type:  'select',
    value: 1,    
    source: [
              {value: 1, text: 'Congestive Heart Failure'},
              {value: 2, text: 'COPD'},
              {value: 3, text: 'Dimensia'}
           ],
    placement: 'right',
  });

  $('a#new-task').click( function() {
    $('#popover_content_wrapper').show(350);
  });

  $('button#new-task-submit').click( function() {
    var taskDesc = $(':input','.form-inline').not(':button, :submit, :reset, :hidden').val(); 

    $('#popover_content_wrapper').hide(350);
    $(':input','.form-inline')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');

    var TaskObject = Parse.Object.extend("Task");
    var task = new TaskObject();
    task.save({desc: taskDesc});
    var clone = $($('ol.task_group_in li')[0]).clone();
    clone.find('span').text(taskDesc);
    $('ol.task_group_in').prepend(clone);
  });

  $('button#new-task-cancel').click( function() {
    $('#popover_content_wrapper').hide(350);
    $(':input','.form-inline')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');
  });

    $('#popover_content_wrapper').hide();

  $('form#new-task-form').submit( function(event) {
    return false;
  });

  Parse.initialize("qoaGnqvRsGAsQ4UiPbR2ExmB7HcqiGBAueYxQXND", "QvA1IsAoo7wAnMdTu9lgeoKB9X7PJTAGeexGXHWZ");

  function renderTask(task) {
    var taskEntry = $(_.template( $("#task_item_template").html(), {task: task}));

    taskEntry.find('.editable-title').editable();
    taskEntry.find(".attach-pic").click(function(){
        $($(this).closest("li").find("form")).removeClass("hidden");
    });
    taskEntry.find(".imgInp").change(function(){
        readURL(this);
    });

    $('ol.task_group_in').append(taskEntry);
  };

    var TaskObject = Parse.Object.extend("Task");
    var query = new Parse.Query(TaskObject);
    query.equalTo('isQuestion', 'F');
    query.ascending('position').find().then(function(tasks) {
        _.each(tasks, renderTask);
      });

  preCreateTasks = function() {
    var TaskObject = Parse.Object.extend("Task");
    var query = new Parse.Query(TaskObject);
    query.find().then(function(tasks) {
        _.each(tasks, function(task) {
          task.destroy();
         }); 
      });
    var predefined = [
    {desc: "Complete/partial bath", isQuestion: "F", position: 1},
    {desc: "Dress/undress", isQuestion: "F", position: 2},
    {desc: "Assist with toileting", isQuestion: "F", position: 3},
    {desc: "Transferring", isQuestion: "F", position: 4},
    {desc: "Personal grooming", isQuestion: "F", position: 5},
    {desc: "Assist with eating/feeding", isQuestion: "F", position: 6},
    {desc: "Ambulation", isQuestion: "F", position: 7},
    {desc: "Turn/Change position", isQuestion: "F", position: 8},
    {desc: "Vital Signs", isQuestion: "F", position: 9},
    {desc: "Assist with self-administration medication", isQuestion: "F", position: 10},
    {desc: "Bowel/bladder", isQuestion: "F", position: 11},
    {desc: "Wound care", isQuestion: "F", position: 12},
    {desc: "ROM", isQuestion: "F", position: 13},
    {desc: "Supervision", isQuestion: "F", position: 14},
    {desc: "Prepare breakfast", isQuestion: "F", position: 15},
    {desc: "Prepare lunch", isQuestion: "F", position: 16},
    {desc: "Prepare dinner", isQuestion: "F", position: 17},
    {desc: "Clean kitchen/wash dishes", isQuestion: "F", position: 18},
    {desc: "Make/change bed linen", isQuestion: "F", position: 19},
    {desc: "Clean areas used by individual", isQuestion: "F", position: 20},
    {desc: "Listing supplies/shopping", isQuestion: "F", position: 21},
    {desc: "Individual's laundry", isQuestion: "F", position: 22},
    {desc: "Medical appointments", isQuestion: "F", position: 23},
    {desc: "Work/school/social", isQuestion: "F", position: 24},
    {desc: "Did you observe any change in the individual's physical condition?", isQuestion: "T", position: 25},
    {desc: "Did you observe any change in the individual's emotional condition?", isQuestion: "T", position: 26},
    {desc: "Was there any change in the individual's regular daily activities?", isQuestion: "T", position: 27},
    {desc: "Do you have an observation about the individual's response to services rendered?", isQuestion: "T", position: 28},
    ];

    _.each (predefined, function(taskitem) {
      var task = new TaskObject();
      task.save(taskitem);
    });
  };
})
