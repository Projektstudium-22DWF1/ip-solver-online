export function validateGuidedProblem (problem, constraints, constraintNames, bounds, validProblem, validConstraint, validConstraintNames, validBound, setValidProblem, setValidConstraint, setValidConstraintNames, setValidBound) {

    const regexProblem = /^(\d*\s*[a-zA-Z_][a-zA-Z0-9_]*)(\s*[\+\-]\s*\d*\s*[a-zA-Z_][a-zA-Z0-9_]*)*\s*$/;
    const regexConstraintName = /^[A-Za-z][A-Za-z0-9]*$/;
    const regexConstraint = /^(\d*\s*[a-zA-Z_][a-zA-Z0-9_]*)(\s*[\+\-]\s*\d*\s*[a-zA-Z_][a-zA-Z0-9_]*\s*)*\s*(<=|>=|=)\s*[0-9]\d*\s*$/;
    const regexBounds = /^([0-9]*\s*[a-zA-Z_][a-zA-Z0-9_]*)\s*(<=|>=|<|>|=)\s*([0-9]\d*)$/;
    const regexDualBounds = /^(\d+)\s*(<=|<)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*(<=|<)\s*(\d+)$/;
    const regexScalarBounds = /^(\d+)\s*(<=|<|=|>|>=)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*$/;

    let valid = true;

    const newValidConstraintNames = [...validConstraintNames];
    const newValidConstraint = [...validConstraint];
    const newValidBound = [...validBound];

    console.log(constraints);
    // Validation for problem
    if (problem === "" || !regexProblem.test(problem)) {
        valid = false;
        setValidProblem(false);
        console.log("Ungültiges Problem: Bitte das Format der Zielfunktion beachten!");
    } else {
        setValidProblem(true);
    }

    // Validation for constraint names
    constraintNames.forEach((e, index) => {
        // console.log(e);
        if (!regexConstraintName.test(e.value)) {
            valid = false;
            newValidConstraintNames[index] = false;
            console.log("Ungültiger Name: Bitte keine Zahlen verwenden und Namen eingeben!");
        } else {
            newValidConstraintNames[index] = true;
        }
        setValidConstraintNames(newValidConstraintNames);
    });

    // Validation for constraints
    constraints.forEach((e, index) => {

        if (e.value.trim() === "" || !regexConstraint.test(e.value)) {
            valid = false;
            newValidConstraint[index] = false;
            console.log("Ungültiger Constraint: Bitte Format beachten!");
        } else {
            newValidConstraint[index] = true;
        }
        setValidConstraint(newValidConstraint);
    });

    // Validation for bounds
    bounds.forEach((e, index) => {
        if (e.value !== "" && !regexBounds.test(e.value) && !regexDualBounds.test(e.value) && !regexScalarBounds.test(e.value)){
            valid = false;
            newValidBound[index] = false;
            console.log("Ungültiger Constraint: Bitte Format beachten!");
        } else {
            newValidBound[index] = true;
        }
        setValidBound(newValidBound);
    });

    return valid;
}