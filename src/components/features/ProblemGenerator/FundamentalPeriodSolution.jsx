import { Fragment } from 'react';
import { MathJax } from "better-react-mathjax";
export default function FundamentalPeriodSolution({ height, kips, E, inertia, G, stiffness, pounds, answer }) {
    /*
    This is a cantilevered column SDOF structure, so we can first
    determine the stiffness of the SDOF and then plug the stiffness into
    the period equation for an SDOF system. Determine stiffness: k =
    3(EI)/h3;
    */
    return (
        <Fragment>
            <p className='flex justify-start'>
                <MathJax>
                    {`Provided Inputs:
                    \\begin{align}
                        &h = ${height}\\ ft, \\\\
                        &W = ${kips}\\ kips,\\\\ 
                        &E = ${E}\\ ksi,\\\\ 
                        &I = ${inertia}\\ in^{4}
                    \\end{align}`}
                </MathJax>
            </p>
            <p>
                <MathJax>
                    {`Constants: \\(G = ${G}\\ in/s^{2}\\)`}
                </MathJax>
            </p>
            <br />
            <p>Step 1: Determine the stiffness of the system (cantilevered column)</p>
            <p className='flex justify-start'>
                <MathJax>
                    {`\\begin{align}
                        k &= \\frac{3(EI)}{h^{3}} \\\\[5px] 
                        &= \\frac{3(${E}\\ ksi)(${inertia}\\ in^{4})}{(${height}\\ ft \\ \\times \\ 12\\ in/ft)^{3}} \\\\[5px] 
                        &= ${stiffness}\\ lb/in
                    \\end{align}`}
                </MathJax>
            </p>
            <br />
            <p>Step 2: Determine the fundamental period</p>
            <p className='flex justify-start'>
                <MathJax>
                    {`\\begin{align}
                        T &= 2\\pi\\sqrt{\\frac{m}{k}} \\\\[5px] 
                        &= 2\\pi\\sqrt{\\frac{W}{Gk}} \\\\[5px] 
                        &= 2\\pi\\sqrt{\\frac{${pounds}\\ lb}{(${G}\\ in/s^{2})(${stiffness}\\ lb/in)}} \\\\[5px] 
                        &= ${answer}\\ s
                    \\end{align}`}
                </MathJax>
            </p>
        </Fragment>
    );
}