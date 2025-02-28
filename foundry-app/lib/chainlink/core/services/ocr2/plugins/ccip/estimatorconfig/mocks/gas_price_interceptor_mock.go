// Code generated by mockery v2.50.0. DO NOT EDIT.

package mocks

import (
	context "context"
	big "math/big"

	mock "github.com/stretchr/testify/mock"
)

// GasPriceInterceptor is an autogenerated mock type for the GasPriceInterceptor type
type GasPriceInterceptor struct {
	mock.Mock
}

type GasPriceInterceptor_Expecter struct {
	mock *mock.Mock
}

func (_m *GasPriceInterceptor) EXPECT() *GasPriceInterceptor_Expecter {
	return &GasPriceInterceptor_Expecter{mock: &_m.Mock}
}

// ModifyGasPriceComponents provides a mock function with given fields: ctx, execGasPrice, daGasPrice
func (_m *GasPriceInterceptor) ModifyGasPriceComponents(ctx context.Context, execGasPrice *big.Int, daGasPrice *big.Int) (*big.Int, *big.Int, error) {
	ret := _m.Called(ctx, execGasPrice, daGasPrice)

	if len(ret) == 0 {
		panic("no return value specified for ModifyGasPriceComponents")
	}

	var r0 *big.Int
	var r1 *big.Int
	var r2 error
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int, *big.Int) (*big.Int, *big.Int, error)); ok {
		return rf(ctx, execGasPrice, daGasPrice)
	}
	if rf, ok := ret.Get(0).(func(context.Context, *big.Int, *big.Int) *big.Int); ok {
		r0 = rf(ctx, execGasPrice, daGasPrice)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*big.Int)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, *big.Int, *big.Int) *big.Int); ok {
		r1 = rf(ctx, execGasPrice, daGasPrice)
	} else {
		if ret.Get(1) != nil {
			r1 = ret.Get(1).(*big.Int)
		}
	}

	if rf, ok := ret.Get(2).(func(context.Context, *big.Int, *big.Int) error); ok {
		r2 = rf(ctx, execGasPrice, daGasPrice)
	} else {
		r2 = ret.Error(2)
	}

	return r0, r1, r2
}

// GasPriceInterceptor_ModifyGasPriceComponents_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'ModifyGasPriceComponents'
type GasPriceInterceptor_ModifyGasPriceComponents_Call struct {
	*mock.Call
}

// ModifyGasPriceComponents is a helper method to define mock.On call
//   - ctx context.Context
//   - execGasPrice *big.Int
//   - daGasPrice *big.Int
func (_e *GasPriceInterceptor_Expecter) ModifyGasPriceComponents(ctx interface{}, execGasPrice interface{}, daGasPrice interface{}) *GasPriceInterceptor_ModifyGasPriceComponents_Call {
	return &GasPriceInterceptor_ModifyGasPriceComponents_Call{Call: _e.mock.On("ModifyGasPriceComponents", ctx, execGasPrice, daGasPrice)}
}

func (_c *GasPriceInterceptor_ModifyGasPriceComponents_Call) Run(run func(ctx context.Context, execGasPrice *big.Int, daGasPrice *big.Int)) *GasPriceInterceptor_ModifyGasPriceComponents_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(*big.Int), args[2].(*big.Int))
	})
	return _c
}

func (_c *GasPriceInterceptor_ModifyGasPriceComponents_Call) Return(modExecGasPrice *big.Int, modDAGasPrice *big.Int, err error) *GasPriceInterceptor_ModifyGasPriceComponents_Call {
	_c.Call.Return(modExecGasPrice, modDAGasPrice, err)
	return _c
}

func (_c *GasPriceInterceptor_ModifyGasPriceComponents_Call) RunAndReturn(run func(context.Context, *big.Int, *big.Int) (*big.Int, *big.Int, error)) *GasPriceInterceptor_ModifyGasPriceComponents_Call {
	_c.Call.Return(run)
	return _c
}

// NewGasPriceInterceptor creates a new instance of GasPriceInterceptor. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewGasPriceInterceptor(t interface {
	mock.TestingT
	Cleanup(func())
}) *GasPriceInterceptor {
	mock := &GasPriceInterceptor{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
