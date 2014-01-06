
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.render('patients', { title: 'Patients' });
};

exports.show2 = function(req, res){
  res.render('show_patient2');
};

exports.show = function(req, res){
  var tasks = [
  {task: "Complete/partial bath", time: "Dec 27 10:29", status: "Confirmed", comments: ""},
  {task: "Dress/undress", time: "Dec 27 10:43", status: "Confirmed", comments: ""},
  {task: "Assist with toileting", time: "Dec 27 10:55", status: "Confirmed", comments: ""},
  {task: "Transferring", time: "Dec 27 11:00", status: "Confirmed", comments: ""},
  {task: "Personal grooming", time: "Dec 27 11:02", status: "Confirmed", comments: ""},
  {task: "Assist with eating/feeding", time: "Dec 27 11:43", status: "Rejected", comments: "Client not feeling well."},
  {task: "Ambulation", time: "Dec 27 11:46", status: "Confirmed", comments: ""},
  {task: "Turn/Change position", time: "Dec 27 11:46", status: "Confirmed", comments: ""},
  {task: "Vital Signs", time: "Dec 27 11:53", status: "Confirmed", comments: "All vital signs normal."},
  {task: "Assist with self-administration medication", time: "Dec 27 11:59", status: "Confirmed", comments: ""},
  {task: "Bowel/bladder", time: "Dec 27 12:32", status: "Confirmed", comments: ""},
  {task: "Wound care", time: "Dec 27 13:40", status: "Confirmed", comments: ""},
  {task: "ROM", time: "Dec 27 13:53", status: "Rejected", comments: "Client declined."},
  {task: "Supervision", time: "Dec 27 13:53", status: "Confirmed", comments: ""},
  {task: "Prepare breakfast", time: "Dec 27 13:57", status: "Confirmed", comments: ""},
  {task: "Prepare lunch", time: "Dec 27 14:09", status: "Confirmed", comments: ""},
  {task: "Prepare dinner", time: "Dec 27 14:46", status: "Confirmed", comments: ""},
  {task: "Clean kitchen/wash dishes", time: "Dec 27 14:41", status: "Confirmed", comments: ""},
  {task: "Make/change bed linen", time: "Dec 27 14:55", status: "Confirmed", comments: ""},
  {task: "Clean areas used by individual", time: "Dec 27 15:06", status: "Confirmed", comments: ""},
  {task: "Listing supplies/shopping", time: "Dec 27 15:23", status: "Confirmed", comments: ""},
  {task: "Individual's laundry", time: "Dec 27 15:33", status: "Confirmed", comments: ""},
  {task: "Medical appointments", time: "Dec 27 15:50", status: "Confirmed", comments: ""},
  {task: "Work/school/social", time: "Dec 27 15:59", status: "Confirmed", comments: ""},
  {task: "Did you observe any change in the individual's physical condition?", time: "Dec 27 16:14", status: "No", comments: ""},
  {task: "Did you observe any change in the individual's emotional condition?", time: "Dec 27 16:14", status: "No", comments: ""},
  {task: "Was there any change in the individual's regular daily activities?", time: "Dec 27 16:14", status: "Yes", comments: "Client did not have lunch today."},
  {task: "Do you have an observation about the individual's response to services rendered?", time: "Dec 27 16:15", status: "No", comments: ""}
  ];
  res.render('show_patient', { tasks: tasks });
};
