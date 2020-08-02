import React from "react";
import ReactDOM from "react-dom";


class Test2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [
                [
                    'a', 'b', 'c', 'd'
                ],
                [
                    'a', 'b', 'c', 'd'
                ]
            ]
        }
    }

    render() {
        return (
            <table className="table-data">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Class</th>
                        <th>Section</th>
                    </tr>

                    {
                    this.state.students.map((item, key) => {

                        const editField = (value, index) => { // Clone students data before mutation
                            const students = this.state.students.map(item => ({
                                ...item
                            }))

                            // Update field by index of current student
                            students[key][index] = value

                            // Trigger re-render
                            this.setState({students})
                        }

                        return (
                            <tr key={key}
                                className={
                                    item.editing ? 'editing' : ''
                                }
                                onClick={
                                    () => { // Clone students data before mutation
                                        const students = this.state.students.map(i => ({
                                            ...i,
                                            editing: item.editing && i === item
                                        }))

                                        // Toggle editing flag of this current student (ie table row)
                                        students[key].editing = true;

                                        // Trigger re-render
                                        this.setState({
                                            clientIsEditing: true, // This might not be needed ?
                                            students
                                        })
                                    }
                            }>
                                <td>{
                                    item.editing ? <input value={
                                            item[1]
                                        }
                                        onChange={
                                            e => editField(e.target.value, 1)
                                        }/> : <span>{
                                        item[1]
                                    }</span>
                                }</td>
                                <td>{
                                    item.editing ? <input value={
                                            item[2]
                                        }
                                        onChange={
                                            e => editField(e.target.value, 2)
                                        }/> : <span>{
                                        item[2]
                                    }</span>
                                }</td>
                                <td>{
                                    item.editing ? <input value={
                                            item[3]
                                        }
                                        onChange={
                                            e => editField(e.target.value, 3)
                                        }/> : <span>{
                                        item[3]
                                    }</span>
                                }</td>
                                <td>{
                                    item.editing ? <input value={
                                            item[4]
                                        }
                                        onChange={
                                            e => editField(e.target.value, 4)
                                        }/> : <span>{
                                        item[4]
                                    }</span>
                                }</td>
                            </tr>
                        )
                    })
                } </tbody>
            </table>
        )
    }
}

export default Test2;
// ReactDOM.render(<TodoApp />, document.querySelector("#app"))
