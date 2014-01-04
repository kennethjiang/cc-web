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
  
  $(".imgInp").change(function(){
      readURL(this);
  });
  
  $(".attach-pic").click(function(){
      $($(this).closest("li").find("form")).removeClass("hidden");
  });
  
  
  $('.editable-title').editable({
    type:  'text',
  });

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


  preCreateTasks = function() {
    var TaskObject = Parse.Object.extend("Task");
    var query = new Parse.Query(TaskObject);
    query.find().then(function(tasks) {
        _.each(tasks, function(task) {
          task.destroy();
         }); 
      });
    var predefined = [
    {desc: "Complete/partial bath", isQuestion: "T"},
    {desc: "Dress/undress", isQuestion: "T"},
    {desc: "Assist with toileting", isQuestion: "T"},
    {desc: "Transferring", isQuestion: "T"},
    {desc: "Personal grooming", isQuestion: "T"},
    {desc: "Assist with eating/feeding", isQuestion: "T"},
    {desc: "Ambulation", isQuestion: "T"},
    {desc: "Turn/Change position", isQuestion: "T"},
    {desc: "Vital Signs", isQuestion: "T"},
    {desc: "Assist with self-administration medication", isQuestion: "T"},
    {desc: "Bowel/bladder", isQuestion: "T"},
    {desc: "Wound care", isQuestion: "T"},
    {desc: "ROM", isQuestion: "T"},
    {desc: "Supervision", isQuestion: "T"},
    {desc: "Prepare breakfast", isQuestion: "T"},
    {desc: "Prepare lunch", isQuestion: "T"},
    {desc: "Prepare dinner", isQuestion: "T"},
    {desc: "Clean kitchen/wash dishes", isQuestion: "T"},
    {desc: "Make/change bed linen", isQuestion: "T"},
    {desc: "Clean areas used by individual", isQuestion: "T"},
    {desc: "Listing supplies/shopping", isQuestion: "T"},
    {desc: "Individual's laundry", isQuestion: "T"},
    {desc: "Medical appointments", isQuestion: "T"},
    {desc: "Work/school/social", isQuestion: "T"},
    {desc: "Did you observe any change in the individual's physical condition?", isQuestion: "T"},
    {desc: "Did you observe any change in the individual's emotional condition?", isQuestion: "T"},
    {desc: "Was there any change in the individual's regular daily activities?", isQuestion: "T"},
    {desc: "Do you have an observation about the individual's response to services rendered?", isQuestion: "T"},
    ];

    _.each (predefined, function(taskitem) {
      var task = new TaskObject();
      task.save(taskitem);
    });
  };
})
