$(function  () {
  var TaskObject = Parse.Object.extend("Task");
  var taskQuery = new Parse.Query(TaskObject);
  var adjustment
  
  $("ol.simple_with_animation").sortable({
    group: 'simple_with_animation',
    handle: 'i.icon-move',
    //pullPlaceholder: false,
    // animation on drop
    onDrop: function  (item, targetContainer, _super) {
      var clonedItem = $('<li/>').css({height: 0});
      item.before(clonedItem);
      clonedItem.animate({'height': item.height()});
      
      item.animate(clonedItem.position(), function  () {
        clonedItem.detach()
        _super(item)
      });

      _.each($('ol.assigned_task_group li'), function(i) {
        taskQuery.get($(i).data('task-id')).then(function(task) {
          task.set('position', $(i).index());
          task.set('assigned', 'T');
          saveTask(task);
        });
      });
      _.each($('ol.unassigned_task_group li'), function(i) {
        taskQuery.get($(i).data('task-id')).then(function(task) {
          task.set('position', $(i).index());
          task.set('assigned', 'F');
          saveTask(task);
        });
      });
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
          taskQuery.get($(input).closest("li").data('task-id')).then( function(task) {
            var parseFile = new Parse.File(input.files[0].name, input.files[0]);
            parseFile.save().then( function() {
              task.set('pic', parseFile);
              saveTask(task);
            });
          });

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
    var taskDesc = $(this).closest('form').find('input[type="text"]').val();
    var isQ = 'F';
    if( $(this).closest('form').find('input[type="checkbox"]').is(':checked') ) {
      isQ = 'T';
    }

    $('#popover_content_wrapper').hide(350);
    $(':input','.form-inline')
    .not(':button, :submit, :reset, :hidden')
    .val('')
    .removeAttr('checked')
    .removeAttr('selected');

    var task = new TaskObject();
    task.save({desc: taskDesc, assigned: 'T', isQuestion: isQ}, {
          success: function(task) {
            console.log('new task: ' + task.id);
            renderTask(task);
          },
          error: function(task, error) {
            alert('Failed to create task: ' + task.id + ', with error code: ' + error.description);
          }
    });
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
    taskEntry.find('.editable-title').on('save', updateTaskDesc);
    taskEntry.find(".attach-pic").click(function(){
        $($(this).closest("li").find("form")).removeClass("hidden");
    });
    taskEntry.find(".imgInp").change(function(){
        readURL(this);
    });
    if( task.get('pic') ) {
      taskEntry.find(".pic-preview img").attr('src', task.get('pic').url());
      taskEntry.find(".pic-preview").removeClass("hidden");
    }
    if( task.get('isQuestion') === 'T' ) {
      taskEntry.addClass("bluebg");
    }

    if( task.get('assigned') === 'T' ) {
      $('ol.assigned_task_group').prepend(taskEntry);
    }
    else {
      $('ol.unassigned_task_group').prepend(taskEntry);
    }
  };

  taskQuery.descending('position').find().then(function(tasks) {
    _.each(tasks, renderTask);
  });

  function updateTaskDesc(e, params) {
    taskQuery.get($($(this).closest("li")).data('task-id')).then(function(task) {
        task.set('desc', params.newValue);
        saveTask(task);
        });
  };

  saveTask = function(task) {
    task.save( null, {
      success: function(task) {
        console.log('Task saved for: ' + task.id);
      },
      error: function(task, error) {
        console.log('ERROR: Failed to save task: ' + task.id + ', with error code: ' + error.description);
      }
    });
  };

  clearTasks = function() {
    taskQuery.find().then(function(tasks) {
        _.each(tasks, function(task) {
          task.destroy();
         }); 
      });
    };
      
  predefinedTasks = function() {
    var predefined = [
    {desc: "Complete/partial bath", assigned: "T", isQuestion: "F", position: 1},
    {desc: "Dress/undress", assigned: "T", isQuestion: "F", position: 2},
    {desc: "Assist with toileting", assigned: "T", isQuestion: "F", position: 3},
    {desc: "Transferring", assigned: "T", isQuestion: "F", position: 4},
    {desc: "Personal grooming", assigned: "T", isQuestion: "F", position: 5},
    {desc: "Assist with eating/feeding", assigned: "T", isQuestion: "F", position: 6},
    {desc: "Ambulation", assigned: "T", isQuestion: "F", position: 7},
    {desc: "Turn/Change position", assigned: "T", isQuestion: "F", position: 8},
    {desc: "Vital Signs", assigned: "T", isQuestion: "F", position: 9},
    {desc: "Assist with self-administration medication", assigned: "T", isQuestion: "F", position: 10},
    {desc: "Bowel/bladder", assigned: "T", isQuestion: "F", position: 11},
    {desc: "Wound care", assigned: "T", isQuestion: "F", position: 12},
    {desc: "ROM", assigned: "T", isQuestion: "F", position: 13},
    {desc: "Supervision", assigned: "T", isQuestion: "F", position: 14},
    {desc: "Prepare breakfast", assigned: "T", isQuestion: "F", position: 15},
    {desc: "Prepare lunch", assigned: "T", isQuestion: "F", position: 16},
    {desc: "Prepare dinner", assigned: "T", isQuestion: "F", position: 17},
    {desc: "Clean kitchen/wash dishes", assigned: "T", isQuestion: "F", position: 18},
    {desc: "Make/change bed linen", assigned: "T", isQuestion: "F", position: 19},
    {desc: "Clean areas used by individual", assigned: "T", isQuestion: "F", position: 20},
    {desc: "Listing supplies/shopping", assigned: "T", isQuestion: "F", position: 21},
    {desc: "Individual's laundry", assigned: "F", isQuestion: "F", position: 22},
    {desc: "Medical appointments", assigned: "F", isQuestion: "F", position: 23},
    {desc: "Work/school/social", assigned: "F", isQuestion: "F", position: 24},
    {desc: "Did you observe any change in the individual's physical condition?", assigned: "T", isQuestion: "T", position: 25},
    {desc: "Did you observe any change in the individual's emotional condition?", assigned: "T", isQuestion: "T", position: 26},
    {desc: "Was there any change in the individual's regular daily activities?", assigned: "T", isQuestion: "T", position: 27},
    {desc: "Do you have an observation about the individual's response to services rendered?", assigned: "T", isQuestion: "T", position: 28},
    ];

    _.each (predefined, function(taskitem) {
      var task = new TaskObject();
      task.save(taskitem);
    });
  };
})
