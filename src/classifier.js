const moment = require("moment");

function yearDifference(a, b) {
  return Math.abs(moment(b).diff(moment(a), "years"));
}

function calculateAge(birthday) {
  return Math.abs(moment(birthday).diff(moment(), "years"));
}

/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */
function classifier(input) {
  if (input.length == 0) {
    return { noOfGroups: 0 };
  }

  const template = {
    noOfGroups: 1,
    group1: {
      members: [],
      oldest: 0,
      sum: 0,
      regNos: []
    }
  };

  let newInput = input.slice().sort((a, b) => {
    return new Date(b.dob) - new Date(a.dob);
  });

  let finalGrouping = newInput.reduce((groupings, newStudent, _, __) => {
    const { dob, regNo } = newStudent;
    const age = calculateAge(dob);
    let lastGroup = groupings[`group${groupings.noOfGroups}`];
    let lastStudent = lastGroup.members[lastGroup.members.length - 1];

    // Create group, and add new student.
    if (lastGroup.members.length === 3 || (!!lastStudent && yearDifference(lastStudent.dob, dob) > 5)) {
      const members = [{ ...newStudent, dob, age }];
      const newGroupName = `group${++groupings.noOfGroups}`;
      groupings[newGroupName] = { members, regNos: [parseInt(regNo, 10)], oldest: age, sum: age };
    } else {
      // Add to last group
      lastGroup.sum += age;
      lastGroup.regNos.push(parseInt(regNo, 10));
      lastGroup.regNos.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      lastGroup.members.push({ ...newStudent, age });
      lastGroup.oldest = Math.max(age, lastGroup.oldest);
    }

    return groupings;
  }, template);

  return finalGrouping;
}

module.exports = classifier;
