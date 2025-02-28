// Code generated by mockery v2.50.0. DO NOT EDIT.

package mocks

import (
	context "context"
	big "math/big"

	ethereum "github.com/ethereum/go-ethereum"

	mock "github.com/stretchr/testify/mock"
)

// FeeHistoryEstimatorClient is an autogenerated mock type for the feeHistoryEstimatorClient type
type FeeHistoryEstimatorClient struct {
	mock.Mock
}

type FeeHistoryEstimatorClient_Expecter struct {
	mock *mock.Mock
}

func (_m *FeeHistoryEstimatorClient) EXPECT() *FeeHistoryEstimatorClient_Expecter {
	return &FeeHistoryEstimatorClient_Expecter{mock: &_m.Mock}
}

// FeeHistory provides a mock function with given fields: ctx, blockCount, lastBlock, rewardPercentiles
func (_m *FeeHistoryEstimatorClient) FeeHistory(ctx context.Context, blockCount uint64, lastBlock *big.Int, rewardPercentiles []float64) (*ethereum.FeeHistory, error) {
	ret := _m.Called(ctx, blockCount, lastBlock, rewardPercentiles)

	if len(ret) == 0 {
		panic("no return value specified for FeeHistory")
	}

	var r0 *ethereum.FeeHistory
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, uint64, *big.Int, []float64) (*ethereum.FeeHistory, error)); ok {
		return rf(ctx, blockCount, lastBlock, rewardPercentiles)
	}
	if rf, ok := ret.Get(0).(func(context.Context, uint64, *big.Int, []float64) *ethereum.FeeHistory); ok {
		r0 = rf(ctx, blockCount, lastBlock, rewardPercentiles)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*ethereum.FeeHistory)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, uint64, *big.Int, []float64) error); ok {
		r1 = rf(ctx, blockCount, lastBlock, rewardPercentiles)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// FeeHistoryEstimatorClient_FeeHistory_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'FeeHistory'
type FeeHistoryEstimatorClient_FeeHistory_Call struct {
	*mock.Call
}

// FeeHistory is a helper method to define mock.On call
//   - ctx context.Context
//   - blockCount uint64
//   - lastBlock *big.Int
//   - rewardPercentiles []float64
func (_e *FeeHistoryEstimatorClient_Expecter) FeeHistory(ctx interface{}, blockCount interface{}, lastBlock interface{}, rewardPercentiles interface{}) *FeeHistoryEstimatorClient_FeeHistory_Call {
	return &FeeHistoryEstimatorClient_FeeHistory_Call{Call: _e.mock.On("FeeHistory", ctx, blockCount, lastBlock, rewardPercentiles)}
}

func (_c *FeeHistoryEstimatorClient_FeeHistory_Call) Run(run func(ctx context.Context, blockCount uint64, lastBlock *big.Int, rewardPercentiles []float64)) *FeeHistoryEstimatorClient_FeeHistory_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(uint64), args[2].(*big.Int), args[3].([]float64))
	})
	return _c
}

func (_c *FeeHistoryEstimatorClient_FeeHistory_Call) Return(feeHistory *ethereum.FeeHistory, err error) *FeeHistoryEstimatorClient_FeeHistory_Call {
	_c.Call.Return(feeHistory, err)
	return _c
}

func (_c *FeeHistoryEstimatorClient_FeeHistory_Call) RunAndReturn(run func(context.Context, uint64, *big.Int, []float64) (*ethereum.FeeHistory, error)) *FeeHistoryEstimatorClient_FeeHistory_Call {
	_c.Call.Return(run)
	return _c
}

// SuggestGasPrice provides a mock function with given fields: ctx
func (_m *FeeHistoryEstimatorClient) SuggestGasPrice(ctx context.Context) (*big.Int, error) {
	ret := _m.Called(ctx)

	if len(ret) == 0 {
		panic("no return value specified for SuggestGasPrice")
	}

	var r0 *big.Int
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context) (*big.Int, error)); ok {
		return rf(ctx)
	}
	if rf, ok := ret.Get(0).(func(context.Context) *big.Int); ok {
		r0 = rf(ctx)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*big.Int)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context) error); ok {
		r1 = rf(ctx)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// FeeHistoryEstimatorClient_SuggestGasPrice_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'SuggestGasPrice'
type FeeHistoryEstimatorClient_SuggestGasPrice_Call struct {
	*mock.Call
}

// SuggestGasPrice is a helper method to define mock.On call
//   - ctx context.Context
func (_e *FeeHistoryEstimatorClient_Expecter) SuggestGasPrice(ctx interface{}) *FeeHistoryEstimatorClient_SuggestGasPrice_Call {
	return &FeeHistoryEstimatorClient_SuggestGasPrice_Call{Call: _e.mock.On("SuggestGasPrice", ctx)}
}

func (_c *FeeHistoryEstimatorClient_SuggestGasPrice_Call) Run(run func(ctx context.Context)) *FeeHistoryEstimatorClient_SuggestGasPrice_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context))
	})
	return _c
}

func (_c *FeeHistoryEstimatorClient_SuggestGasPrice_Call) Return(_a0 *big.Int, _a1 error) *FeeHistoryEstimatorClient_SuggestGasPrice_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *FeeHistoryEstimatorClient_SuggestGasPrice_Call) RunAndReturn(run func(context.Context) (*big.Int, error)) *FeeHistoryEstimatorClient_SuggestGasPrice_Call {
	_c.Call.Return(run)
	return _c
}

// NewFeeHistoryEstimatorClient creates a new instance of FeeHistoryEstimatorClient. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewFeeHistoryEstimatorClient(t interface {
	mock.TestingT
	Cleanup(func())
}) *FeeHistoryEstimatorClient {
	mock := &FeeHistoryEstimatorClient{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
