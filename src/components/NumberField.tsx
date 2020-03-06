import React from 'react';

import '../css/utility.scss';
import '../css/field.scss';

type Props = {
  focus?: boolean,
  placeholder: string,
  label: string,
  value?: string,
  error?: string,
  onChange: (value: string) => void;
}

export default class extends React.Component<Props> {
  ref: React.RefObject<any>;

  constructor(props: Props) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    if(this.props.focus) {
      this.ref.current.focus();
    }
  }

  onChange = (evt: any) => {
    const value = evt.target.value;
    this.props.onChange(value);
  };

  render() {
    return (
      <label>
        <span className="hidden">{this.props.label}</span>
        <input
          type="number"
          ref={this.ref}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.onChange}
        />
        <div className="field__error">{this.props.error}</div>
      </label>
    );
  }
};
