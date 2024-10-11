export function validateGuidedProblem(states) {
  let valid = true;

  return valid;
}

export function validateProblem(prob, validProblem, setValidProblem) {
  let valid = true;
  const regexProblem =
    /^(-?\d*\s*[a-zA-Z_][a-zA-Z0-9_]*)(\s*[+-]\s*\d*\s*[a-zA-Z_][a-zA-Z0-9_]*)*\s*$/;
  const newValidProb = [...validProblem];

  prob.forEach((e, index) => {
    if (e.value === "" || !regexProblem.test(e.value)) {
      valid = false;
      newValidProb[index] = false;
    } else {
      newValidProb[index] = true;
    }
    setValidProblem(newValidProb);
  });
  return valid;
}

export function validateConstraints(
  constraints,
  validConstraint,
  setValidConstraint,
) {
  let valid = true;
  const regexConstraint =
    /^(-?\d*\s*[a-zA-Z_][a-zA-Z0-9_]*)(\s*[+-]\s*\d*\s*[a-zA-Z_][a-zA-Z0-9_]*\s*)*\s*(<=|>=|=)\s*[0-9]\d*\s*$/;
  const newValidConstraint = [...validConstraint];
  // Validation for constraints
  constraints.forEach((e, index) => {
    if (e.value.trim() === "" || !regexConstraint.test(e.value)) {
      valid = false;
      newValidConstraint[index] = false;
    } else {
      newValidConstraint[index] = true;
    }
    setValidConstraint(newValidConstraint);
  });

  return valid;
}

export function validateConstraintNames(
  constraintNames,
  validConstraintNames,
  setValidConstraintNames,
) {
  let valid = true;
  const regexConstraintName = /^[A-Za-z_][A-Za-z0-9_]*\s*$/;
  const newValidConstraintNames = [...validConstraintNames];

  // Validation for constraint names
  constraintNames.forEach((e, index) => {
    if (!regexConstraintName.test(e.value) && e.value !== "") {
      valid = false;
      newValidConstraintNames[index] = false;
    } else {
      newValidConstraintNames[index] = true;
    }
    setValidConstraintNames(newValidConstraintNames);
  });

  return valid;
}

export function validateBound(bounds, validBound, setValidBound) {
  let valid = true;
  const regexBounds =
    /^([0-9]*\s*[a-zA-Z_][a-zA-Z0-9_]*)\s*(<=|>=|<|>|=)\s*([0-9]\d*)\s*$/;
  const regexDualBounds =
    /^(\d+)\s*(<=|<)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*(<=|<)\s*(\d+)\s*$/;
  const regexScalarBounds =
    /^(\d+)\s*(<=|<|=|>|>=)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*$/;

  const newValidBound = [...validBound];

  bounds.forEach((e, index) => {
    if (
      !regexBounds.test(e.value) &&
      !regexDualBounds.test(e.value) &&
      !regexScalarBounds.test(e.value) &&
      e.value !== ""
    ) {
      valid = false;
      newValidBound[index] = false;
    } else {
      newValidBound[index] = true;
    }
    setValidBound(newValidBound);
  });

  return valid;
}
